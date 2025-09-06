import style from "./toggleBtn.module.css";

type Props = {
  value: number; // 0 or 1
  onChange: () => void;
  id: string; // unique id for each toggle
};

const ToggleBtn = ({ value, onChange, id }: Props) => {
  return (
    <>
      <input
        type="checkbox"
        id={id}
        checked={value === 1}
        onChange={onChange}
        className={style.ToggleBtn_checkbox}
      />
      <label htmlFor={id} className={style.ToggleBtn}></label>
    </>
  );
};

export default ToggleBtn;
