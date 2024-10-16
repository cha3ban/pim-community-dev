import React from 'react';
import {Badge, Level} from 'akeneo-design-system';
import {useTranslate} from '@akeneo-pim-community/shared';
import {JobStatus} from '../models/JobStatus';

const badgeLevel = (status: JobStatus, hasError: boolean, hasWarning: boolean): Level => {
  if (status === 'FAILED' || hasError) {
    return 'danger';
  }
  if (hasWarning) {
    return 'warning';
  }

  return 'primary';
};

type JobExecutionStatusProps = {
  status: JobStatus;
  currentStep: number;
  totalSteps: number;
  hasWarning: boolean;
  hasError: boolean;
};

const JobExecutionStatus = ({
  status,
  currentStep,
  totalSteps,
  hasWarning,
  hasError,
  ...props
}: JobExecutionStatusProps) => {
  const level = badgeLevel(status, hasError, hasWarning);
  const translate = useTranslate();

  let label = translate(`pim_import_export.job_status.${status}`);
  if (status === 'STARTING' || status === 'STARTED') {
    label = `${label} ${currentStep}/${totalSteps}`;
  }

  return (
    <Badge level={level} {...props}>
      {label}
    </Badge>
  );
};

export {JobExecutionStatus};
