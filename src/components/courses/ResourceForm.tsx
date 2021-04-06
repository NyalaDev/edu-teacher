import React from 'react';
import { useFormik } from 'formik';

import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, TextInput, AutoCompleteInput } from '../UI';
import { patchCourse } from '../../services/api.service';
import { extractErrorMessage } from '../../common/helpers';
import { Course, Language } from '../../types/api.types';

type Props = {
  course?: Course | undefined;
};

const ResourceForm: React.FC<Props> = ({ course, handleUpdateCourse }) => {
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      text: '',
      url: '',
      type: 'link',
    },
    validationSchema: Yup.object().shape({
      text: Yup.string().required(),
      url: Yup.string()
        .matches(
          /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
          'Please enter a valid  URL'
        )
        .required(),
    }),
    onSubmit: async values => {
      const resources = course.resources || [];
      try {
        resources.push(values);
        const data = await patchCourse({ resources }, course.id);
        handleUpdateCourse(data);
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
            name="type"
            label={t('type')}
            placeholder={t('type')}
            error={touched.type && errors.type && errors.type}
            readOnly
            {...getFieldProps('type')}
          />
          <TextInput
            name="text"
            label={t('title')}
            placeholder={t('title')}
            error={touched.text && errors.text && errors.text}
            {...getFieldProps('text')}
          />

          <TextInput
            name="url"
            label={t('url')}
            placeholder="https://youtube.com?watch=1sAw2asd"
            error={touched.url && errors.url && errors.url}
            forceLtr
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

export default ResourceForm;
