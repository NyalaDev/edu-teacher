import React, { useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { GrDocumentVideo, GrResources, GrDocument } from 'react-icons/gr';
import { ActivityIndicator, Clickable, PageTitle } from '../components/UI';
import { CourseForm, ResourcesList, CourseTags } from '../components/courses';
import { LecturesList } from '../components/lectures';
import { getCourseDetails, patchCourse } from '../services/api.service';
import { AppContext } from '../contexts/AppContext';
import { Course } from '../types/api.types';

interface Params {
  slug: string;
}

const tabs = [
  { id: 1, title: 'courseDetails', icon: GrDocument },
  { id: 2, title: 'lectures', icon: GrDocumentVideo },
  { id: 3, title: 'resources', icon: GrResources },
];

type StyledButtonProps = {
  disabled?: boolean;
  color?: string;
};

const StyledButton = styled.button.attrs<StyledButtonProps>(
  ({ color, disabled }) => ({
    className: `${
      disabled
        ? ' bg-gray-300 cursor-not-allowed text-grey-700'
        : `bg-${color}-600 hover:bg-${color}-400 text-white`
    }  rounded focus:outline-none w-full border rounded-full py-2 px-4 text-xs font-semibold `,
  })
)``;

const ManageCourse: React.FC = () => {
  const { t } = useTranslation();
  const { slug } = useParams<Params>();
  const { state } = useContext(AppContext);
  const [refreshIndex, setRefreshIndex] = useState(0);
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

  const courseBadge = {
    text: status,
    color: `${status === 'Published' ? 'green' : 'red'}-600`,
  };
  return (
    <ActivityIndicator active={state.fetching || !course.id}>
      <PageTitle title={course.title} badge={courseBadge} />

      <div className="flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-1/5">
          <div className="bg-white rounded overflow-hidden shadow-lg">
            <div className="text-center p-6  border-b">
              <ActivityIndicator active={updatingStatus}>
                <StyledButton
                  type="button"
                  onClick={toggleCourseStatus}
                  disabled={!hasLectures}
                  color={actionBtnColor}
                >
                  {t(actionBtnLabel)}
                </StyledButton>
              </ActivityIndicator>
            </div>
            <div className="border-b">
              {tabs.map((tab, index) => (
                <div
                  className={`px-4 py-4 hover:bg-gray-100 flex w-full border-b ${
                    index + 1 === currentTab ? 'bg-gray-100' : ''
                  }`}
                  key={tab.id}
                >
                  <Clickable
                    key={tab.id}
                    onClick={() => setCurrentTab(index + 1)}
                    className="flex w-full"
                  >
                    <div className="text-gray-800">
                      <tab.icon />
                    </div>
                    <div className="pl-3">
                      <p className="text-sm font-medium text-gray-800 leading-none">
                        {t(tab.title)}
                      </p>
                      {/* <p className="text-xs text-gray-500">Subtitle</p> */}
                    </div>
                  </Clickable>
                </div>
              ))}
            </div>
          </div>
          <CourseTags
            courseId={course.id}
            courseTags={courseTags}
            allTags={state.tags}
            refreshData={refreshData}
          />
        </div>
        <div className="w-full md:w-4/5 md:mx-5 mt-6 md:mt-0">
          {currentTab === 1 && (
            <CourseForm
              languages={state.languages}
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
