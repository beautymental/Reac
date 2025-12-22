import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSettings, SETTINGS_DEFAULTS } from "../state/SettingsContext.jsx";
import Button from "../ui/Button.jsx";
import Badge from "../ui/Badge.jsx";

const schema = yup.object({
  playerName: yup.string().max(24, "Максимум 24 символи").nullable(),
  difficulty: yup.string().oneOf(["easy", "normal", "hard"]).required(),
  maxAttempts: yup.number().typeError("Введи число").min(3).max(15).required(),
  timeLimitSec: yup.number().typeError("Введи число").min(0).max(300).required(),
  tickMs: yup.number().typeError("Введи число").min(100).max(5000).required(),
  wordLengthMin: yup.number().typeError("Введи число").min(2).max(20).required(),
  wordLengthMax: yup.number().typeError("Введи число").min(2).max(20).required(),
}).test("len-range", "wordLengthMax має бути >= wordLengthMin", (v) => {
  if (!v) return true;
  return Number(v.wordLengthMax) >= Number(v.wordLengthMin);
});

export default function SettingsForm() {
  const { settings, updateSettings, resetSettings } = useSettings();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    watch,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: settings,
  });

  // якщо settings оновились ззовні — синхронізуємо форму
  useEffect(() => {
    reset(settings);
  }, [settings, reset]);

  const onSubmit = (data) => {
    updateSettings({
      ...data,
      playerName: (data.playerName ?? "").trim(),
    });
  };

  const timeLimit = watch("timeLimitSec");

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid">
        <label className="field">
          <span className="field__label">Імʼя</span>
          <input className="input" placeholder="Напр. Олександр" {...register("playerName")} />
          {errors.playerName && <span className="error">{errors.playerName.message}</span>}
        </label>

        <label className="field">
          <span className="field__label">Складність</span>
          <select className="input" {...register("difficulty")}>
            <option value="easy">Easy</option>
            <option value="normal">Normal</option>
            <option value="hard">Hard</option>
          </select>
          {errors.difficulty && <span className="error">{errors.difficulty.message}</span>}
        </label>

        <label className="field">
          <span className="field__label">Кількість елементів / спроб (3–15)</span>
          <input className="input" type="number" {...register("maxAttempts")} />
          {errors.maxAttempts && <span className="error">{errors.maxAttempts.message}</span>}
        </label>

        <label className="field">
          <span className="field__label">Таймер раунду (сек) (0 = вимкнено)</span>
          <input className="input" type="number" {...register("timeLimitSec")} />
          {errors.timeLimitSec && <span className="error">{errors.timeLimitSec.message}</span>}
        </label>

        <label className="field">
          <span className="field__label">Швидкість таймера tick (мс)</span>
          <input className="input" type="number" {...register("tickMs")} disabled={Number(timeLimit) === 0} />
          {errors.tickMs && <span className="error">{errors.tickMs.message}</span>}
        </label>

        <label className="field">
          <span className="field__label">Довжина слова мін</span>
          <input className="input" type="number" {...register("wordLengthMin")} />
          {errors.wordLengthMin && <span className="error">{errors.wordLengthMin.message}</span>}
        </label>

        <label className="field">
          <span className="field__label">Довжина слова макс</span>
          <input className="input" type="number" {...register("wordLengthMax")} />
          {errors.wordLengthMax && <span className="error">{errors.wordLengthMax.message}</span>}
        </label>
      </div>

      <div className="form__bar">
        <Badge tone={isValid ? "success" : "warning"}>{isValid ? "OK" : "Є помилки"}</Badge>
        <div className="actions">
          <Button type="submit" disabled={!isDirty || !isValid}>Зберегти</Button>
          <Button
            variant="ghost"
            type="button"
            onClick={() => {
              resetSettings();
              reset(SETTINGS_DEFAULTS);
            }}
          >
            Скинути
          </Button>
        </div>
      </div>
    </form>
  );
}
