"use client";

export default function LearningRoadmap() {
  const milestones = [
    { title: "HTML/CSS", progress: 90, color: "bg-orange-500" },
    { title: "JavaScript", progress: 75, color: "bg-yellow-400" },
    { title: "Python (Flask)", progress: 60, color: "bg-blue-500" },
    { title: "React/Next.js", progress: 40, color: "bg-cyan-400" },
    { title: "Docker/AWS", progress: 20, color: "bg-purple-500" },
  ];

  return (
    <div className="space-y-4">
      {milestones.map((item) => (
        <div key={item.title}>
          <div className="flex justify-between mb-1">
            <span className="text-xs font-medium text-gray-300">{item.title}</span>
            <span className="text-xs font-medium text-gray-400">{item.progress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5 overflow-hidden">
            <div
              className={`${item.color} h-2.5 rounded-full transition-all duration-1000 ease-out`}
              style={{ width: `${item.progress}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}

