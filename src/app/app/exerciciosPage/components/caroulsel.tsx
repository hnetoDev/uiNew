import React from 'react';
import { Carousel } from 'antd';

import { Md10Mp } from 'react-icons/md';

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: '160px',
  color: '#ffd000',
  lineHeight: '160px',
  textAlign: 'center',
  
};

const Carrosel: React.FC = () => (
  <>
    <Carousel arrows nextArrow={<div><Md10Mp className='text-red-500'/></div>} infinite={false}>
      <div>
        <h3 style={contentStyle}>1</h3>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  </>
);

export default Carrosel;