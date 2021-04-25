import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { orderBy } from 'lodash';
import { BiChevronDown, BiSearchAlt2 } from 'react-icons/bi';
import { CourseCard } from '../components/courses';
import { ActivityIndicator, PageTitle } from '../components/UI';
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
      <PageTitle title={t('courses')} />

      <div className="my-2 flex sm:flex-row flex-col">
        <div className="flex flex-row mb-1 sm:mb-0">
          <div className="relative">
            <select
              className="h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              onChange={onSortbyCreationDate}
              value={createdAtValue.created_at}
              name="created_at"
            >
              <option value="-1">{t('creationDate')}</option>
              <option value="newest">{t('newest')}</option>
              <option value="oldest">{t('oldest')}</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <BiChevronDown />
            </div>
          </div>
          <div className="relative">
            <select
              className="h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500"
              onChange={onSortbystatus}
              value={statusValue.status}
              name="status"
            >
              <option value="-1">{t('status')}</option>
              <option value="published">{t('published')}</option>
              <option value="draft">{t('draft')}</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <BiChevronDown />
            </div>
          </div>
        </div>
        <div className="block relative">
          <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
            <BiSearchAlt2 color="grey" />
          </span>
          <input
            placeholder="Search"
            className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none"
            onChange={onFilterCourse}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-4 mt-5">
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
