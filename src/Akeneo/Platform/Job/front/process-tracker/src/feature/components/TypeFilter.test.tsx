import React from 'react';
import {renderWithProviders} from '@akeneo-pim-community/shared';
import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {TypeFilter} from './TypeFilter';

jest.mock('../hooks/useJobExecutionTypes', () => ({
  useJobExecutionTypes: (): string[] => ['import', 'export', 'mass_edit'],
}));

test('it opens a dropdown when clicking on the filter', () => {
  renderWithProviders(<TypeFilter typeFilterValue={[]} onTypeFilterChange={jest.fn()} />);

  expect(screen.queryByText('akeneo_job_process_tracker.type.label')).not.toBeInTheDocument();

  userEvent.click(screen.getByText('akeneo_job_process_tracker.type.all'));

  expect(screen.getByText('akeneo_job_process_tracker.type.label')).toBeInTheDocument();
});

test('it can select all type', () => {
  const handleChange = jest.fn();

  renderWithProviders(<TypeFilter typeFilterValue={['export']} onTypeFilterChange={handleChange} />);

  userEvent.click(screen.getByText('akeneo_job_process_tracker.type.export'));
  userEvent.click(screen.getByText('akeneo_job_process_tracker.type.all'));

  expect(handleChange).toHaveBeenCalledWith([]);
  expect(screen.getByText('akeneo_job_process_tracker.type.all')).toBeInTheDocument();
});

test('it can select multiple type', () => {
  const handleChange = jest.fn();

  renderWithProviders(<TypeFilter typeFilterValue={['export']} onTypeFilterChange={handleChange} />);

  userEvent.click(screen.getByText('akeneo_job_process_tracker.type.export'));
  userEvent.click(screen.getByText('akeneo_job_process_tracker.type.mass_edit'));

  expect(handleChange).toHaveBeenCalledWith(['export', 'mass_edit']);
});

test('it can unselect a type', () => {
  const handleChange = jest.fn();

  renderWithProviders(<TypeFilter typeFilterValue={['export', 'mass_edit']} onTypeFilterChange={handleChange} />);

  userEvent.click(screen.getByText('pim_common.selected'));
  userEvent.click(screen.getByText('akeneo_job_process_tracker.type.export'));

  expect(handleChange).toHaveBeenCalledWith(['mass_edit']);
  expect(screen.getByText('akeneo_job_process_tracker.type.mass_edit')).toBeInTheDocument();
});
