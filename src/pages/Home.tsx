import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { orderBy } from 'lodash';
import { CourseCard } from '../components/courses';
import { ActivityIndicator, TextInput } from '../components/UI';
import { getCourses } from '../services/api.service';
import { Course } from '../types/api.types';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [fetching, setFetching] = useState(true);
  const [apiCourses, setApiCourses] = useState<[Course]>();
  const [courses, setCourses] = useState<Course[]>();
  const [statusValue, setStatusValue] = useState({
    status: '-1',
  });
  const [createdAtValue, setCreatedAtValue] = useState({
    created_at: '-1',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCourses();
        setCourses(result);
        setApiCourses(result);
      } catch (e) {
        //
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, []);

  const onFilterCourse = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const {
      target: { value },
    } = e;
    // TODO: Move this to filter from the back-end when we add the pagination
    if (!value) {
      setCourses(apiCourses);
      return;
    }
    try {
      const formattedQuery = value.toLowerCase();
      const filteredCourses =
        courses &&
        (courses.filter(course => {
          const { title, description } = course;
          return (
            title.toLowerCase().includes(formattedQuery) ||
            description.toLowerCase().includes(formattedQuery)
          );
        }) as [Course]);
      setCourses(filteredCourses);
    } catch (err) {
      setCourses(apiCourses);
    }
  };

  const onSortbyCreationDate = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      target: { value },
    } = e;

    if (!value) {
      return;
    }
    const sortType = value === 'newest' ? 'desc' : 'asc';
    const sortedCourses = orderBy(courses, 'created_at', sortType);
    setCreatedAtValue({ created_at: value });
    setStatusValue({ status: '-1' });
    setCourses(sortedCourses);
  };

  const onSortbystatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {
      target: { value },
    } = e;
    if (!value) {
      return;
    }
    setStatusValue({ status: value });
    const sortType = value === 'draft' ? 'asc' : 'desc';
    const sortedCourses = orderBy(
      courses,
      [course => course.status.toLowerCase()],
      [sortType]
    );
    setStatusValue({ status: value });
    setCreatedAtValue({ created_at: '-1' });
    setCourses(sortedCourses);
  };

  return (
    <ActivityIndicator active={fetching}>
      <h1 className="text-4xl font-bold leading-tight mb-5">{t('courses')}</h1>
      <div className="flex flex-col md:flex-row justify-between px-2 py-3 mb-5">
        <div>
          <TextInput
            placeholder={t('filterCourses')}
            onChange={onFilterCourse}
          />
          <span>Sort by</span>
          <select
            className="w-full py-2 px-4 bg-gray-100 text-gray-700 border border-gray-300 rounded  block appearance-none placeholder-gray-500 focus:outline-none focus:bg-white"
            onChange={onSortbyCreationDate}
            value={createdAtValue.created_at}
            name="created_at"
          >
            <option value="-1">{t('creationDate')}</option>
            <option value="newest">{t('newest')}</option>
            <option value="oldest">{t('oldest')}</option>
          </select>

          <select
            className="w-full py-2 px-4 bg-gray-100 text-gray-700 border border-gray-300 rounded  block appearance-none placeholder-gray-500 focus:outline-none focus:bg-white"
            onChange={onSortbystatus}
            value={statusValue.status}
            name="status"
          >
            <option value="-1">{t('status')}</option>
            <option value="published">{t('published')}</option>
            <option value="draft">{t('draft')}</option>
          </select>
        </div>
        <div>
          <Link
            to="/new-course"
            className="py-2 px-4 mr-0 md:mr-11 bg-red-500 text-white rounded hover:bg-gray-600 focus:outline-none"
          >
            {t('newCourse')}
          </Link>
        </div>
      </div>
      <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-4">
        {courses &&
          courses.map(course => (
            <Link to={`/manage/${course.slug}`} key={course.id}>
              <CourseCard course={course} />
            </Link>
          ))}
      </div>
    </ActivityIndicator>
  );
};

export default Home;
