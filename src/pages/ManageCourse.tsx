import React, { useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Badge, ActivityIndicator, Clickable } from '../components/UI';
import { CourseForm } from '../components/courses';
import { getCourseDetails } from '../services/api.service';
import { AppContext } from '../contexts/AppContext';
import { Course } from '../types/api.types';

interface Params {
  slug: string;
}

const tabs = [
  { id: 1, title: 'courseDetails' },
  { id: 2, title: 'lectures' },
  { id: 3, title: 'resources' },
];

const ManageCourse: React.FC = () => {
  const { t } = useTranslation();
  const { slug } = useParams<Params>();

  const { fetching, languages } = useContext(AppContext);
  const [course, setCourse] = useState({} as Course);
  const [currentTab, setCurrentTab] = useState(1);
  const { status } = course;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCourseDetails(slug);
      setCourse(data);
    };
    fetchData();
  }, [slug]);

  const handleUpdateCourse = (updatedCourse: Course) =>
    setCourse(updatedCourse);

  return (
    <ActivityIndicator active={fetching || !course.id}>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-1/4">
          {status && (
            <Badge
              text={status}
              color={`${status === 'Published' ? 'green' : 'red'}-600`}
            />
          )}
          <ul className="flex flex-col">
            {tabs.map((tab, index) => (
              <Clickable key={tab.id} onClick={() => setCurrentTab(index + 1)}>
                <li
                  className={`rounded-t -mb-px block border p-4 border-grey hover:bg-gray-800 hover:text-white cursor-pointer ${
                    tab.id === currentTab && 'bg-gray-800 text-white'
                  }`}
                >
                  {t(tab.title)}
                </li>
              </Clickable>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-2/3">
          {currentTab === 1 && (
            <CourseForm
              languages={languages}
              course={course}
              handleUpdateCourse={handleUpdateCourse}
            />
          )}
          {currentTab === 2 && <div>lectures</div>}
          {currentTab === 3 && <div>resourses</div>}
        </div>
      </div>
    </ActivityIndicator>
  );
};
export default ManageCourse;
