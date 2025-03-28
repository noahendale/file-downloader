// Notes: If there was more time I would have added a test for the select all checkbox and the download button with no files selected

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Table from './Table.tsx';
import files from '../data/files.ts';

describe('Table Component', () => {
  test('renders the table with correct headers and data', () => {
    render(<Table />);
    
    files.forEach(file => {
      expect(screen.getByText(file.name)).toBeInTheDocument();
    });

    expect(screen.getByText('None Selected')).toBeInTheDocument();
  }); 
  
  test('clicking a row selects the file', () => {
    render(<Table />);
    
    const row = screen.getByRole('row', { name: /netsh\.exe/i });
    expect(row).not.toHaveClass('selected');
    fireEvent.click(row);
    
    expect(row).toHaveClass('selected');
    expect(screen.getByText('Selected 1')).toBeInTheDocument();
  });
  
  test('clicking Download Selected shows alert with correct files', () => {
    window.alert = jest.fn();
    render(<Table />);

    fireEvent.click(screen.getByRole('row', { name: /netsh\.exe/i }));
    fireEvent.click(screen.getByLabelText('Download selected files'));

    expect(window.alert).toHaveBeenCalledWith(expect.stringContaining('netsh.exe (Luigi)'));
  });
});
