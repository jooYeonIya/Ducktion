import React from 'react';
import '@styles/components/Labels.css';

const HorizontalRule = ({ type }) => {
  return <hr className={`custom-hr ${type}`} />;
};

export default HorizontalRule;
