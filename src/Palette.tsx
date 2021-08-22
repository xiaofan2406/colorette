import * as React from 'react';
import Color from 'color';
import ColorBlock from './ColorBlock';
import classes from './Palette.module.css';

const defaultColor = '#212121';
const defaultCount = 9;
const defaultScaleStep = 0.2;

function Palette() {
  const [startColor, setStartColor] = React.useState(defaultColor);
  const [scales, setScales] = React.useState(() =>
    Array(defaultCount)
      .fill(defaultScaleStep)
      .map((value, index) => +(value * index).toFixed(2))
  );

  const palette = scales.map((scale) => {
    return {
      scale,
      color: Color(startColor).lighten(scale).hex().toLowerCase(),
    };
  });

  return (
    <div className={classes.palette}>
      <form
        className={classes.newColorForm}
        onSubmit={(event) => {
          event.preventDefault();
          let value = event.currentTarget.color.value;

          try {
            Color(value);
          } catch (error) {
            value = defaultColor;
          }

          setStartColor(value);
        }}
      >
        <input type="text" name="color" defaultValue={defaultColor} />
        <button type="submit">Generate</button>
      </form>
      {palette.map((entry, index) => {
        return (
          <ColorBlock
            key={index}
            {...entry}
            onRemove={() => {
              setScales((prev) => [
                ...prev.slice(0, index),
                ...prev.slice(index + 1),
              ]);
            }}
            onChangeScale={(newScale) => {
              setScales((prev) => {
                const copy = [...prev];
                copy[index] = +newScale.toFixed(2);
                return copy;
              });
            }}
          />
        );
      })}
      <div
        className={classes.newColorButton}
        onClick={() => {
          setScales((prev) => {
            const last = prev[prev.length - 1];
            return [...prev, +(last + defaultScaleStep).toFixed(2)];
          });
        }}
      >
        Add New
      </div>
      <div className={classes.controls}>
        <button
          onClick={() => {
            window.navigator.clipboard.writeText(
              [...palette]
                .reverse()
                .map((entry) => `'${entry.color}'`)
                .join(',')
            );
          }}
        >
          Copy as strings
        </button>
        <button
          onClick={() => {
            window.navigator.clipboard.writeText(
              [...palette]
                .reverse()
                .map((entry, index) => `--color-${index + 1}: ${entry.color};`)
                .join('\n')
            );
          }}
        >
          Copy as CSS Variables
        </button>
      </div>
    </div>
  );
}

export default Palette;
