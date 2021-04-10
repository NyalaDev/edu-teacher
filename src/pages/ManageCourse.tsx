import React, { useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Badge, ActivityIndicator, Clickable } from '../components/UI';
import { CourseForm, ResourcesList, CourseTags } from '../components/courses';
import { LecturesList } from '../components/lectures';
import { getCourseDetails, patchCourse } from '../services/api.service';
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

type StyledButtonProps = {
  disabled?: boolean;
  color?: string;
};

const StyledButton = styled.button.attrs<StyledButtonProps>(
  ({ color, disabled }) => ({
    className: `py-2 px-4 bg-${
      disabled ? 'gray' : color
    }-600 text-white rounded hover:bg-${color}-400 focus:outline-none w-full ${
      disabled && 'cursor-not-allowed'
    }`,
  })
)``;

const ManageCourse: React.FC = () => {
  const { t } = useTranslation();
  const { slug } = useParams<Params>();
  const [refreshIndex, setRefreshIndex] = useState(0);
  const { fetching, languages, tags } = useContext(AppContext);
  const [course, setCourse] = useState({} as Course);
  const [currentTab, setCurrentTab] = useState(1);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  const { status, tags: courseTags } = course;

  const actionBtnLabel = status === 'Published' ? 'unpublish' : 'publish';
  const actionBtnColor = status === 'Published' ? 'red' : 'green';
  const hasLectures = course && course.lectures && course.lectures.length > 0;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCourseDetails(slug);
      setCourse(data);
    };
    fetchData();
  }, [slug, refreshIndex]);

  const refreshData = () => setRefreshIndex(refreshIndex + 1);

  const toggleCourseStatus = async () => {
    try {
      setUpdatingStatus(true);
      const courseStatus = status === 'Draft' ? 'Published' : 'Draft';
      await patchCourse({ status: courseStatus }, course.id);
      refreshData();
      setUpdatingStatus(false);
    } catch (e) {
      setUpdatingStatus(false);
    }
  };

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
          <div className="w-full flex mt-5">
            <ActivityIndicator active={updatingStatus}>
              <StyledButton
                type="button"
                disabled={!hasLectures}
                color={actionBtnColor}
                onClick={toggleCourseStatus}
              >
                {t(actionBtnLabel)}
              </StyledButton>
            </ActivityIndicator>
          </div>
          <CourseTags
            courseId={course.id}
            courseTags={courseTags}
            allTags={tags}
            refreshData={refreshData}
          />
        </div>
        <div className="w-full md:w-2/3">
          {currentTab === 1 && (
            <CourseForm
              languages={languages}
              course={course}
              onSaveCourse={refreshData}
            />
          )}
          {currentTab === 2 && (
            <LecturesList course={course} refreshData={refreshData} />
          )}
          {currentTab === 3 && (
            <ResourcesList course={course} refreshData={refreshData} />
          )}
        </div>
      </div>
    </ActivityIndicator>
  );
};
export default ManageCourse;
