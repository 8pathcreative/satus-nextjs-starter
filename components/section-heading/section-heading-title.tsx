import React from 'react';

interface SectionHeadingTitleProps {
  title: string;
  subtitle?: string;
}

const SectionHeadingTitle: React.FC<SectionHeadingTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-8">
      <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-lg text-muted">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionHeadingTitle;