import { useEffect, useState } from 'react';
import { CourseCard } from '../components/courses';
import { ActivityIndicator } from '../components/UI';

import { getCourses } from '../services/api.service';
import { Course } from '../types/api.types';

const Home: React.FC = () => {
  const [fetching, setFetching] = useState(true);
  const [courses, setCourses] = useState<[Course]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getCourses();
        setCourses(result);
      } catch (e) {
        //
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-1 gap-4">
      <ActivityIndicator active={fetching}>
        {courses &&
          courses.map(course => <CourseCard key={course.id} course={course} />)}
      </ActivityIndicator>
    </div>
  );
};

export default Home;
