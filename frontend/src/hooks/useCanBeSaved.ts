import { useAppSelector } from "./useAppSelector";

export function useCanBeSaved() {
  const save = useAppSelector((state) =>
    state.saves.find(
      (save) => save.registration.hash === state.registration.hash
    )
  );

  const from = useAppSelector((state) => ({
    rounds: state.rounds,
    comments: state.comments,
    digitCode: state.digitCode,
  }));

  if (!save) {
    return true;
  }

  const to = {
    rounds: save?.rounds,
    comments: save?.comments,
    digitCode: save?.digitCode,
  };

  return JSON.stringify(from) !== JSON.stringify(to);
}
