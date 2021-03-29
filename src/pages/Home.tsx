import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CourseCard } from '../components/courses';
import { ActivityIndicator, TextInput } from '../components/UI';

import { getCourses } from '../services/api.service';
import { Course } from '../types/api.types';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [fetching, setFetching] = useState(true);
  const [apiCourses, setApiCourses] = useState<[Course]>();
  const [courses, setCourses] = useState<[Course]>();

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

  return (
    <ActivityIndicator active={fetching}>
      <h1 className="text-4xl font-bold leading-tight mb-5">{t('courses')}</h1>
      <div className="flex flex-col md:flex-row justify-between px-2 py-3 mb-5">
        <div>
          <TextInput
            placeholder={t('filterCourses')}
            onChange={onFilterCourse}
          />
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
          courses.map(course => <CourseCard key={course.id} course={course} />)}
      </div>
    </ActivityIndicator>
  );
};

export default Home;
