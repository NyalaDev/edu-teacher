import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { CourseForm } from '../components/courses';
import { ActivityIndicator } from '../components/UI';
import { getLanguages } from '../services/api.service';
import { Language } from '../types/api.types';

const NewCourse: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const [fetching, setFetching] = useState(false);
  const [languages, setLanguages] = useState<Language[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetching(true);
        const result = await getLanguages();
        setLanguages(result);
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, []);
  return (
    <ActivityIndicator active={fetching}>
      <h1 className="text-3xl font-bold leading-tight mb-5">
        {t('addCourse')}
      </h1>
      <CourseForm
        languages={languages}
        onSaveCourse={() => history.push('/')}
      />
    </ActivityIndicator>
  );
};

export default NewCourse;
