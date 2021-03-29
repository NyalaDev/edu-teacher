import { Link } from 'react-router-dom';
import { HtmlViewer, Badge } from '../UI';
import { Course } from '../../types/api.types';
import useLanguage from '../../hooks/useLanguage';
import {
  getLocalisedLanguageName,
  getYoutubeThumbnail,
} from '../../common/helpers';

type ComponentProps = {
  course: Course;
};
const Home: React.FC<ComponentProps> = ({ course }) => {
  const isRtlCourse = course.language.iso2 === 'ar';
  const { isRtl } = useLanguage();
  const firstLecture = course.lectures[0];

  return (
    <div
      className={`rounded bg-gray-50 max-w-sm overflow-hidden shadow-lg ${
        isRtl ? 'rtl' : 'ltr'
      }`}
    >
      <Link to="/">
        <img
          className="w-full h-56"
          src={getYoutubeThumbnail(firstLecture.url)}
          alt={course.title}
        />
      </Link>
      <div className="px-6 py-4">
        <div className="title text-xl mb-2">
          <Link to="/">{course.title}</Link>
        </div>

        <div className="flex flex-wrap my-2">
          <Badge
            text={getLocalisedLanguageName(course.language.iso2)}
            languageBadge={course.language.iso2}
          />

          <Badge
            text={course.status}
            color={`${course.status === 'Published' ? 'green' : 'red'}-600`}
          />
        </div>

        <HtmlViewer
          className={`text-gray-700 text-base text-${
            isRtlCourse ? 'right' : 'left'
          }`}
          data={course.description}
        />
      </div>
      <div className="px-6 py-2">
        <div className="flex flex-wrap">
          {course.tags.map(tag => (
            <Badge key={tag.tagSlug} text={tag.tagName} color="purple-800" />
          ))}
          {course.level && <Badge text={course.level} color="pink-800" />}
        </div>
      </div>
    </div>
  );
};

export default Home;
