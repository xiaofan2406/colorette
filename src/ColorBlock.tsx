import * as React from 'react';
import Color from 'color';
import classes from './ColorBlock.module.css';

type ColorBlockProps = {
  color: string;
  scale: number;
  onRemove: () => void;
  onChangeScale: (newScale: number) => void;
};

function ColorBlock({color, scale, onRemove, onChangeScale}: ColorBlockProps) {
  return (
    <div className={classes.colorBlock}>
      <div
        className={classes.colorDisplay}
        style={{
          color: Color(color).isDark() ? '#ffffff' : '#5a5a5a',
          backgroundColor: color,
        }}
      >
        <span>{color}</span>
      </div>

      <div className={classes.controls}>
        <button
          className={classes.controlButton}
          onClick={() => onChangeScale(scale - 0.1)}
        >
          &#8606;
        </button>
        <button
          className={classes.controlButton}
          onClick={() => onChangeScale(scale - 0.01)}
        >
          &#8592;
        </button>
        <span className={classes.scale}>{scale}</span>
        <button
          className={classes.controlButton}
          onClick={() => onChangeScale(scale + 0.01)}
        >
          &#8594;
        </button>
        <button
          className={classes.controlButton}
          onClick={() => onChangeScale(scale + 0.1)}
        >
          &#8608;
        </button>
        <button className={classes.controlButton} onClick={onRemove}>
          &#10005;
        </button>
      </div>
    </div>
  );
}

export default ColorBlock;
