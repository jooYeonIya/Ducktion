import React from 'react';
import '/Users/mingyukim/KostaDuck/Ducktion/fe/src/styles/components/HorizontalRule.css';

const HorizontalRule = ({ type }) => {
  return <hr className={`custom-hr ${type}`} />;
};

export default HorizontalRule;
