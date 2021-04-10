import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { Course } from '../../types/api.types';
import { ActivityIndicator, TextInput } from '../UI';
import { extractErrorMessage } from '../../common/helpers';
import { importFromYoutube } from '../../services/api.service';

type ImportLecturesFormProps = {
  course: Course;
  onSaveComplete: () => void;
};

const ImportLecturesForm: React.FC<ImportLecturesFormProps> = ({
  course,
  onSaveComplete,
}) => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      url: '',
    },
    validationSchema: Yup.object().shape({
      url: Yup.string()
        .matches(
          // eslint-disable-next-line no-useless-escape
          /^.*(youtu.be\/|list=)([^#\&\?]*).*/,
          'Please enter a valid youtube playlist URL'
        )
        .required(),
    }),
    onSubmit: async values => {
      try {
        await importFromYoutube({ ...values, course: course.id });
        onSaveComplete();
      } catch (e) {
        const message = extractErrorMessage(e);
        toast.error(message);
      }
    },
  });
  const { touched, errors, getFieldProps } = formik;

  return (
    <div className="w-full">
      <div className="py-4 px-6">
        <form onSubmit={formik.handleSubmit}>
          <TextInput
            label={t('youtubeURL')}
            placeholder="https://youtube.com/playlists?s="
            error={(touched.url && errors.url && errors.url) || ''}
            {...getFieldProps('url')}
          />

          <div className="flex justify-between items-center mt-6">
            <ActivityIndicator active={formik.isSubmitting}>
              <button
                className="py-2 px-4 bg-gray-700 text-white rounded hover:bg-gray-600 focus:outline-none"
                type="submit"
              >
                {t('save')}
              </button>
            </ActivityIndicator>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImportLecturesForm;
