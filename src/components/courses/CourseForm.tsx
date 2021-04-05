import { useEffect } from 'react';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { ActivityIndicator, TextInput, AutoCompleteInput } from '../UI';
import { AutoCompleteOption } from '../UI/AutoCompleteInput';
import { Course, Language } from '../../types/api.types';
import { saveCourse, updateCourse } from '../../services/api.service';
import { extractErrorMessage } from '../../common/helpers';
import { CourseLevels } from '../../common/constants';
import { CourseFormTypes } from '../../types/form.types';

type Props = {
  languages: Language[] | undefined;
  course?: Course;
  handleUpdateCourse: (updatedCourse: Course) => void;
};

const CourseForm: React.FC<Props> = ({
  languages,
  course,
  handleUpdateCourse,
}) => {
  const { t } = useTranslation();

  const isNewCourse = course && !course.id;

  const slugify = (text: string): string => {
    return text.toLowerCase().replace(/\s+/g, '-');
  };

  const formik = useFormik({
    initialValues: {
      title: course?.title || '',
      slug: course?.slug || '',
      description: course?.description || '',
      github_repo: course?.github_repo || '',
      language: (course?.language && course?.language.id) || 0,
      level: (course && course.level) || CourseLevels[0],
    },
    validationSchema: Yup.object().shape({
      language: Yup.number().min(1, 'Language is required').required(),
      title: Yup.string().required(),
      slug: Yup.string().required(),
      github_repo: Yup.string().url('Enter a valid url please'),
      description: Yup.string().min(10).required(),
    }),
    onSubmit: async (values: CourseFormTypes) => {
      try {
        const courseData = { ...values };
        if (isNewCourse) {
          courseData.slug = slugify(values.slug);
          await saveCourse(courseData);
          handleUpdateCourse({} as Course);
        } else {
          const data = await updateCourse(courseData, course?.id || -1);
          handleUpdateCourse(data);
        }
      } catch (err) {
        const message = extractErrorMessage(err);
        toast.error(message);
      }
    },
  });

  const languageToAutoCompleteOption = (): [AutoCompleteOption] => {
    if (!languages) return ([] as unknown) as [AutoCompleteOption];
    return (languages.map(lang => ({
      id: lang.id,
      name: lang.name,
    })) as unknown) as [AutoCompleteOption];
  };

  const getInitialLanguageValue = (): AutoCompleteOption => {
    const language = course?.language;
    if (language) {
      return ({
        id: language.id,
        name: language.name,
      } as unknown) as AutoCompleteOption;
    }
    return {} as AutoCompleteOption;
  };

  const { getFieldProps, touched, errors, values } = formik;

  useEffect(() => {
    if (!values.title) {
      formik.setFieldValue('slug', '');
      return;
    }
    const slug = slugify(values.title);
    formik.setFieldValue('slug', slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.title]);

  return (
    <div className="bg-white w-full rounded-lg shadow-md overflow-hidden mx-auto">
      <div className="py-4 px-6">
        <form onSubmit={formik.handleSubmit}>
          <AutoCompleteInput
            options={languageToAutoCompleteOption()}
            onOptionSelect={language =>
              formik.setFieldValue('language', language.id)
            }
            name="languages"
            label={t('selectLanguage')}
            placeholder={t('selectLanguage')}
            onBlur={formik.handleBlur}
            error={
              (touched.language && errors.language && errors.language) || ''
            }
            initialValue={getInitialLanguageValue()}
          />
          <TextInput
            label={t('courseTitle')}
            placeholder={t('courseTitle')}
            error={(touched.title && errors.title) || ''}
            {...getFieldProps('title')}
          />
          {isNewCourse && (
            <TextInput
              label={t('courseSlug')}
              placeholder="Unique name for the course url"
              prefix="https://barmaga.io/courses/"
              error={(touched.slug && errors.slug && errors.slug) || ''}
              {...getFieldProps('slug')}
            />
          )}
          <TextInput
            label={t('courseDescription')}
            placeholder={t('courseDescription')}
            type="textarea"
            error={
              (touched.description &&
                errors.description &&
                errors.description) ||
              ''
            }
            {...getFieldProps('description')}
          />
          <TextInput
            label="Github Repo"
            placeholder="https://github.com/repo"
            error={
              (touched.github_repo &&
                errors.github_repo &&
                errors.github_repo) ||
              ''
            }
            {...getFieldProps('github_repo')}
          />

          <label
            htmlFor="level"
            className="font-bold text-grey-darker block mb-1"
          >
            {t('courseLevel')}
          </label>
          <select
            className="w-full py-2 px-4 bg-gray-100 text-gray-700 border border-gray-300 rounded  block appearance-none placeholder-gray-500 focus:outline-none focus:bg-white"
            {...getFieldProps('level')}
          >
            {CourseLevels.map(item => (
              <option key={item}>{item}</option>
            ))}
          </select>

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

CourseForm.defaultProps = {
  course: {} as Course,
};

export default CourseForm;
