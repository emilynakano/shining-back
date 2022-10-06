import dayjs from 'dayjs';

interface IStage {
  stage4: boolean;
  stage3: boolean;
  stage2: boolean;
  stage1: boolean;
}

interface IProgress {
  stage: IStage
  date: Date
}

function findStage(stage: IStage) {
  if (stage.stage4) {
    return 4;
  }
  if (stage.stage3) {
    return 3;
  }
  if (stage.stage2) {
    return 2;
  }
  if (stage.stage1) {
    return 1;
  }
  return 0;
}

export function progressIsCorrectly({ stage, date }: IProgress) {
  if (!stage.stage4 && dayjs().diff(date, 'month') > 1) {
    return false;
  }
  if (!stage.stage3 && dayjs().diff(date, 'day') > 7) {
    return false;
  }
  if (!stage.stage2 && dayjs().diff(date, 'day') > 1) {
    return false;
  }
  if (!stage.stage1 && dayjs().diff(date, 'hour') > 5) {
    return false;
  }
  return true;
}

export function progress({ stage, date }: IProgress) {
  return progressIsCorrectly({ stage, date }) ? `${findStage(stage)}/4` : 'lost';
}
