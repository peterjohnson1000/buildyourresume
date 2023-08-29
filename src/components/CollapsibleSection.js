import React from 'react';
import Collapse from 'react-collapse';

const CollapsibleSection = () => {
  const [expanded, setExpanded] = React.useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="bg-gray-600 w-[600px]">
      <div onClick={toggleExpand} className="p-5 bg-red-900 text-white">
        title
      </div>
      <Collapse isOpened={expanded}>
        <div className="text-white text-center">
            hello
        </div>
      </Collapse>
    </div>
  );
};

export default CollapsibleSection;
