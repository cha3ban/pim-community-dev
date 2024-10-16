import React from 'react';
import {renderWithProviders} from '@akeneo-pim-community/shared';
import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {StatusFilter} from './StatusFilter';

test('it opens a dropdown when clicking on the filter', () => {
  renderWithProviders(<StatusFilter statusFilterValue={[]} onStatusFilterChange={jest.fn()} />);

  expect(screen.queryByText('akeneo_job_process_tracker.status.label')).not.toBeInTheDocument();

  userEvent.click(screen.getByText('akeneo_job_process_tracker.status.all'));

  expect(screen.getByText('akeneo_job_process_tracker.status.label')).toBeInTheDocument();
});

test('it can select all status', () => {
  const handleChange = jest.fn();

  renderWithProviders(<StatusFilter statusFilterValue={['COMPLETED']} onStatusFilterChange={handleChange} />);

  userEvent.click(screen.getByText('akeneo_job_process_tracker.status.completed'));
  userEvent.click(screen.getByText('akeneo_job_process_tracker.status.all'));

  expect(handleChange).toHaveBeenCalledWith([]);
  expect(screen.getByText('akeneo_job_process_tracker.status.all')).toBeInTheDocument();
});

test('it can select multiple status', () => {
  const handleChange = jest.fn();

  renderWithProviders(<StatusFilter statusFilterValue={['COMPLETED']} onStatusFilterChange={handleChange} />);

  userEvent.click(screen.getByText('akeneo_job_process_tracker.status.completed'));
  userEvent.click(screen.getByText('akeneo_job_process_tracker.status.abandoned'));

  expect(handleChange).toHaveBeenCalledWith(['COMPLETED', 'ABANDONED']);
});

test('it can unselect a status', () => {
  const handleChange = jest.fn();

  renderWithProviders(
    <StatusFilter statusFilterValue={['COMPLETED', 'ABANDONED']} onStatusFilterChange={handleChange} />
  );

  userEvent.click(screen.getByText('pim_common.selected'));
  userEvent.click(screen.getByText('akeneo_job_process_tracker.status.abandoned'));

  expect(handleChange).toHaveBeenCalledWith(['COMPLETED']);
  expect(screen.getByText('akeneo_job_process_tracker.status.completed')).toBeInTheDocument();
});
