import PropTypes from "prop-types";
import {
  CheckCircleIcon,
  ClockIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import StatCard from "./StatCard";

const TodoStats = ({ todos }) => {
  const completed = todos.filter((todo) => todo.completed).length;
  const pending = todos.filter((todo) => !todo.completed).length;
  const highPriority = todos.filter(
    (todo) => todo.priority === "high" && !todo.completed
  ).length;

  const stats = [
    {
      label: "Completed Tasks",
      value: completed,
      icon: CheckCircleIcon,
      color: "text-green-500",
      bg: "bg-green-100",
    },
    {
      label: "In Progress",
      value: pending,
      icon: ClockIcon,
      color: "text-blue-500",
      bg: "bg-blue-100",
    },
    {
      label: "High Priority",
      value: highPriority,
      icon: ExclamationCircleIcon,
      color: "text-red-500",
      bg: "bg-red-100",
    },
  ];

  return (
    <div className="relative mb-16">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-1/3 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
        <div className="absolute top-10 right-1/3 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4">
        {stats.map((stat, index) => (
          <StatCard key={stat.label} {...stat} index={index} />
        ))}
      </div>
    </div>
  );
};

TodoStats.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      priority: PropTypes.oneOf(["low", "medium", "high"]).isRequired,
    })
  ).isRequired,
};

export default TodoStats;
