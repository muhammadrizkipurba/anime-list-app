type Notification = {
  isError?: boolean;
  isWarning?: boolean;
  title: string;
  text: string;
};

type Props = {
  notification: Notification;
};

const Notification: React.FC<Props> = ({ notification }) => {
  const { isError, isWarning, title, text } = notification;

  if (notification && Object.keys(notification).length > 0) {
    return (
      <div role="alert">
        <div className={`${isError ? "bg-red-500" : isWarning ? "bg-orange-500" : "bg-green-500"} text-white font-bold rounded-t px-4 py-2`}>
          {title}
        </div>
        <div className={`border border-t-0 ${isError ? "border-red-400 bg-red-100" : isWarning ? "border-orange-400 bg-orange-100" : "border-green-400 bg-green-100"} rounded-b  px-4 py-3`}>
          <p className={isError ? "text-red-700 dark:text-red-700" : isWarning ? "text-orange-700 dark:text-orange-700" : "text-green-900 dark:text-green-900"}>{text}</p>
        </div>
      </div>
    );
  }

  return null;
};

export default Notification;
