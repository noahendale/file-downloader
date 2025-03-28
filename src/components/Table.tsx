// Notes: I avoided using the table element because it isn't great for accessibility, SEO or customized designs

// Assumptions
// 1. All file names are unique
// 2. The data is static and doesn't need to be fetched from an API
// 3. All files have a name, device, path, and status
// 4. Only need to suppport English
// 5. Only need to support desktop screens

import React, { useState } from 'react';
import '../styles/table.css';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import DownloadIcon from '@mui/icons-material/Download';
import files from '../data/files.ts';
import { STATUS_AVAILABLE, COLOR_PRIMARY, STATUS_SCHEDULED } from '../utilities/constants';

const Table = () => {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const tableHeadings = Object.keys(files[0]);

  const availableFiles = files.filter(file => file.status === STATUS_AVAILABLE);

  const handleFileSelection = (e: React.SyntheticEvent, name: string, status: string) => {
    if (status === STATUS_SCHEDULED) return;
    selectedFiles.includes(name) ?
      setSelectedFiles(selectedFiles.filter(selectedFile => selectedFile !== name))
    :
      setSelectedFiles([...selectedFiles, name]);
    e.currentTarget.classList.toggle('selected');
  }

  const getSelectAllCheckboxState = () => {
    if (selectedFiles.length === 0) return <CheckBoxOutlineBlankIcon/>;
    else if (selectedFiles.length === availableFiles.length) return <CheckBoxIcon style={{color: COLOR_PRIMARY}}/>;
    return <IndeterminateCheckBoxIcon style={{color: COLOR_PRIMARY}}/>;
  }

  const handleSelectAllFiles = () => {
    if (selectedFiles.length === availableFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(availableFiles.map(file => file.name));
    }
    // loop through availableFiles, find the tr element with the id of the file name, and toggle the 'selected' class
    availableFiles.forEach(file => {
      const row = document.getElementById(file.name); // document.querySelector doesn't like the dot (.) in the file name
      if (row) {
        row.classList.toggle('selected');
      }
    });
  }

  const handleDownloadSelectedFiles = () => {
    if (selectedFiles.length === 0) {
      alert('No files selected');
      return;
    }
    const selectedFilesData = files.filter(file => selectedFiles.includes(file.name));
    const selectedFilesString = selectedFilesData.map(file => `${file.name} (${file.device})`).join(', ');
    alert(`Downloading ${selectedFilesString}`);
  }

  return (
    <main>
      <div className="table-header">
        <button
          className="header__item"
          onClick={handleSelectAllFiles}
          onKeyDown={(e) => {
            if (e.code === "Enter" || e.code === "Space") handleSelectAllFiles();
          }}
          tabIndex={0}
          aria-label="Select all files"
        >
          {getSelectAllCheckboxState()}
          <span className="header__item">
            {selectedFiles.length === 0 ?
              'None selected'
            :
              `${selectedFiles.length} selected`
            }
          </span>
        </button>
        <button className="header__item" aria-label="Download selected files" onClick={handleDownloadSelectedFiles}>
          <DownloadIcon />
          Download Selected
        </button>
      </div>
      <table tabIndex={0}>
        <thead>
          <tr className='table-header' tabIndex={0}>
            <th></th>
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
              onClick={(e) => handleFileSelection(e, file?.name, file?.status)}
              onKeyDown={(e) => {
                if ((e.code === "Enter" || e.code === "Space")) handleFileSelection(e, file.name, file?.status);
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
              {/* <td className="table-cell"><CheckBoxIcon style={{color: colorPrimary}}/></td> */}
              {/* <td className="table-cell"><input type="checkbox" className="table-cell" disabled={file.status === 'scheduled'} /></td> */}
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
