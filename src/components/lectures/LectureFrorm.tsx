import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { ActivityIndicator, TextInput } from '../UI';
import { Course } from '../../types/api.types';
import { extractErrorMessage } from '../../common/helpers';
import { saveLecture } from '../../services/api.service';

type LecturesFromProps = {
  course: Course;
  onSaveComplete: () => void;
};

const LecturesFrom: React.FC<LecturesFromProps> = ({
  course,
  onSaveComplete,
}) => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      title: '',
      url: '',
      description: '',
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required(),
      url: Yup.string()
        .matches(
          /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})?$/,
          'Please enter a valid youtube URL'
        )
        .required(),
    }),
    onSubmit: async values => {
      try {
        await saveLecture({ ...values, course: course.id });
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
            label={t('lectureTitle')}
            placeholder={t('lectureTitle')}
            error={(touched.title && errors.title && errors.title) || ''}
            {...getFieldProps('title')}
          />

          <TextInput
            label={t('youtubeURL')}
            placeholder="https://youtube.com?watch=1sAw2asd"
            error={(touched.url && errors.url && errors.url) || ''}
            {...getFieldProps('url')}
          />

          <TextInput
            label={t('lectureDescription')}
            placeholder={t('lectureDescription')}
            type="textarea"
            error={
              (touched.description &&
                errors.description &&
                errors.description) ||
              ''
            }
            {...getFieldProps('description')}
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

export default LecturesFrom;
