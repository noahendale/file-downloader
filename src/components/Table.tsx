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
import files from '../data/files.ts';
import { STATUS_SCHEDULED, COLOR_PRIMARY } from '../utilities/constants';

const Table = () => {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const tableHeadings = Object.keys(files[0]);

  const handleFileSelection = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>, name: string, status: string) => {
    if (status === STATUS_SCHEDULED) return;  
    selectedFiles.includes(name) ?
      setSelectedFiles(selectedFiles.filter(selectedFile => selectedFile !== name))
    :
      setSelectedFiles([...selectedFiles, name]);
    e.currentTarget.classList.toggle('selected');
  }

  return (
    <main>
      <div className="table-header">
        <button className="header__item">
        {selectedFiles.length > 0 ?
          <IndeterminateCheckBoxIcon
            style={{color: COLOR_PRIMARY}}
          />
        :
          <CheckBoxOutlineBlankIcon/>}
        </button>
        <button className="header__item">Download Selected</button>
      </div>
      <table>
        <thead>
          <tr className='table-header'>
            <th></th>
            {tableHeadings.map((heading, index) => (
              <th key={index} className="header__item capitalize">{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={file.name} className={`table-row `} onClick={(e) => handleFileSelection(e, file?.name, file?.status)}>
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
              <td className="table-cell capitalize">{file?.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default Table;
