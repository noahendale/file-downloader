// Notes: I avoided using the table element because it isn't great for accessibility, SEO or customized designs

// Assumptions
// 1. All file names are unique
// 2. The data is static and doesn't need to be fetched from an API
// 3. All files have a name, device, path, and status
// 4. Only need to suppport English
// 5. Only need to support desktop screens
//  5a. If mobile was a requirement, I would use a different approach to display the data such as divs with flexbox or grid instead of a table


// TODO: MEMOIZE??

import React, { useState } from 'react';
import '../styles/table.css';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import DownloadIcon from '@mui/icons-material/Download';
import files from '../data/files.ts';
import { STATUS_AVAILABLE, COLOR_PRIMARY } from '../utilities/constants';

const Table = () => {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const tableHeadings = Object.keys(files[0]);

  const handleFileSelection = (e: React.SyntheticEvent, name: string) => {
    selectedFiles.includes(name) ?
      setSelectedFiles(selectedFiles.filter(selectedFile => selectedFile !== name))
    :
      setSelectedFiles([...selectedFiles, name]);
    e.currentTarget.classList.toggle('selected');
  }

  const getSelectAllCheckboxState = () => {
    if (selectedFiles.length === 0) return <CheckBoxOutlineBlankIcon/>;
    else if (selectedFiles.length === files.length) return <CheckBoxIcon style={{color: COLOR_PRIMARY}}/>;
    return <IndeterminateCheckBoxIcon style={{color: COLOR_PRIMARY}}/>;
  }

  const handleSelectAllFiles = () => {
    const allRows = document.querySelectorAll('.table-row');

    if (selectedFiles.length === files.length) {
      setSelectedFiles([]);
      allRows.forEach(row => row.classList.remove('selected'));
    } else {
      setSelectedFiles(files.map(file => file.name));
      allRows.forEach(row => row.classList.add('selected'));
    }
  }

  const handleDownloadSelectedFiles = () => {
    if (selectedFiles.length === 0) {
      alert('No files selected');
      return;
    }
    const selectedAndAvailableFiles = files.filter(file => selectedFiles.includes(file.name) && file.status === STATUS_AVAILABLE);
    const selectedFilesString = selectedAndAvailableFiles.map(file => `${file.name} (${file.device})`).join(', ');
    alert(`Downloading ${selectedFilesString}`);
  }

  return (
    <main>
      <div className="button-container">
        <button
          className="header-button"
          onClick={handleSelectAllFiles}
          tabIndex={0}
          aria-label="Select all files"
        >
          {getSelectAllCheckboxState()}
          <span>
            {selectedFiles.length === 0 ?
              'None Selected'
            :
              `Selected ${selectedFiles.length}`
            }
          </span>
        </button>
        <button className="header-button" aria-label="Download selected files" onClick={handleDownloadSelectedFiles}>
          <DownloadIcon />
          Download Selected
        </button>
      </div>
      <table tabIndex={0}>
        <thead>
          <tr className='table-header' tabIndex={0}>
            <th aria-hidden="true"></th>
            {tableHeadings.map((heading, index) => (
              <th key={index} className="header__item capitalize">{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr
              key={file.name}
              id={file.name}
              className='table-row'
              onClick={(e) => handleFileSelection(e, file?.name)}
              onKeyDown={(e) => {
                if ((e.code === "Enter" || e.code === "Space")) handleFileSelection(e, file.name);
              }}
              tabIndex={0}
            >
              <td className="table-cell">
                {selectedFiles.includes(file?.name) ?
                  <CheckBoxIcon style={{color: COLOR_PRIMARY}}/>
                :
                  <CheckBoxOutlineBlankIcon/>
                }
              </td>
              <td className="table-cell">{file?.name}</td>
              <td className="table-cell">{file?.device}</td>
              <td className="table-cell">{file?.path}</td>
              <td className="table-cell capitalize">
                {
                  <>
                    {file?.status === STATUS_AVAILABLE && <div className='green-circle'></div>}
                    {file?.status}
                  </>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default Table;
