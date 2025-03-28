// Notes: I avoided using the table element because it isn't great for accessibility, SEO or customized designs

// Assumptions
// 1. All file names are unique
// 2. The data is static and doesn't need to be fetched from an API
// 3. All files have a name, device, path, and status
// 4. Only need to suppport English
// 5. Only need to support desktop screens

import { useState } from 'react';
import './styles/table.css';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import files from './data/files';

function App() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const tableHeadings = Object.keys(files[0]);
  const colorPrimary = '#4b95e0';

  const handleFileSelection = (fileName) => {    
    selectedFiles.includes(fileName) ?
      setSelectedFiles(selectedFiles.filter(selectedFile => selectedFile !== fileName))
    :
      setSelectedFiles([...selectedFiles, fileName]);
  }

  return (
    <main>
      <div className="table-header">
        <button className="header__item">
          <IndeterminateCheckBoxIcon
            style={{color: colorPrimary}}
          />
          <CheckBoxOutlineBlankIcon/>None Selected
        </button>
        <button className="header__item">Download Selected</button>
      </div>
      <table>
        <thead>
          <tr className='table-header' bordercolor="black">
            <th></th>
            {tableHeadings.map((heading, index) => (
              <th key={index} className="header__item capitalize">{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={file.name} className="table-row" onClick={() => handleFileSelection(file.name)}>
              <td className="table-cell"><CheckBoxOutlineBlankIcon/></td>
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

export default App;
