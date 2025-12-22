import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "../ui/Button.jsx";
import Badge from "../ui/Badge.jsx";
import styles from "./SettingsForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DEFAULT_SETTINGS, resetSettings, selectSettings, updateSettings } from "../store/slices/settingsSlice.js";

const schema = yup.object({
  playerName: yup.string().max(24, "Максимум 24 символи").nullable(),
  difficulty: yup.string().oneOf(["easy","normal","hard"]).required(),
  maxAttempts: yup.number().typeError("Введи число").min(3).max(15).required(),
  timeLimitSec: yup.number().typeError("Введи число").min(0).max(300).required(),
  tickMs: yup.number().typeError("Введи число").min(100).max(5000).required(),
  wordLengthMin: yup.number().typeError("Введи число").min(2).max(20).required(),
  wordLengthMax: yup.number().typeError("Введи число").min(2).max(20).required(),
}).test("len-range", "wordLengthMax має бути >= wordLengthMin", (v) => {
  if (!v) return true;
  return Number(v.wordLengthMax) >= Number(v.wordLengthMin);
});

export default function SettingsForm(){
  const { userId="guest" } = useParams();
  const dispatch = useDispatch();
  const settings = useSelector((s)=> selectSettings(s, userId));

  const { register, handleSubmit, formState: { errors, isValid, isDirty }, reset, watch } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: settings,
  });

  useEffect(() => { reset(settings); }, [settings, reset]);

  const onSubmit = (data) => {
    dispatch(updateSettings({ userId, patch: { ...data, playerName: (data.playerName ?? "").trim() } }));
  };

  const timeLimit = watch("timeLimitSec");

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.grid}>
        <label className={styles.field}>
          <span className={styles.label}>Імʼя</span>
          <input className={styles.input} placeholder="Напр. Олександр" {...register("playerName")} />
          {errors.playerName && <span className={styles.error}>{errors.playerName.message}</span>}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Складність</span>
          <select className={styles.input} {...register("difficulty")}>
            <option value="easy">Easy</option>
            <option value="normal">Normal</option>
            <option value="hard">Hard</option>
          </select>
          {errors.difficulty && <span className={styles.error}>{errors.difficulty.message}</span>}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Спроби (3–15)</span>
          <input className={styles.input} type="number" {...register("maxAttempts")} />
          {errors.maxAttempts && <span className={styles.error}>{errors.maxAttempts.message}</span>}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Таймер (сек), 0=off</span>
          <input className={styles.input} type="number" {...register("timeLimitSec")} />
          {errors.timeLimitSec && <span className={styles.error}>{errors.timeLimitSec.message}</span>}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Tick (мс)</span>
          <input className={styles.input} type="number" {...register("tickMs")} disabled={Number(timeLimit) === 0} />
          {errors.tickMs && <span className={styles.error}>{errors.tickMs.message}</span>}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Довжина слова мін</span>
          <input className={styles.input} type="number" {...register("wordLengthMin")} />
          {errors.wordLengthMin && <span className={styles.error}>{errors.wordLengthMin.message}</span>}
        </label>

        <label className={styles.field}>
          <span className={styles.label}>Довжина слова макс</span>
          <input className={styles.input} type="number" {...register("wordLengthMax")} />
          {errors.wordLengthMax && <span className={styles.error}>{errors.wordLengthMax.message}</span>}
        </label>
      </div>

      <div className={styles.bar}>
        <Badge tone={isValid ? "success" : "warning"}>{isValid ? "OK" : "Є помилки"}</Badge>
        <div className={styles.actions}>
          <Button type="submit" disabled={!isDirty || !isValid}>Зберегти</Button>
          <Button
            variant="ghost"
            type="button"
            onClick={() => {
              dispatch(resetSettings(userId));
              reset(DEFAULT_SETTINGS);
            }}
          >
            Скинути
          </Button>
        </div>
      </div>
    </form>
  );
}
