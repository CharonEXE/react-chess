import React from 'react';

export default function MoveHistoryLogger({ moveHistory }) {

    const maxRows = 14;
    const numberOfRows = Math.max(Math.ceil((moveHistory?.length)/2) || 0, maxRows);
  
    const addRow = () => {
        return(
            <tbody>
                {[...Array(numberOfRows)].map((_, rowIndex) => {
                const moveIndex = rowIndex * 2;
                const move = moveHistory ? moveHistory[moveIndex] : null;
    
                return (
                    <tr key={rowIndex} style={{ borderBottom: '1px solid #ddd' }}>
                        <td style={{textAlign: "center", width:"100px"}}>
                            {rowIndex + 1}
                        </td>
                        <td style={{textAlign: "center", width:"115px"}}>
                            {moveIndex < (moveHistory?.length || 0) ? move : ''}
                        </td>
                        <td style={{textAlign: "center", width:"115px"}}>
                            {moveIndex + 1 < (moveHistory?.length || 0) ? (moveHistory && moveHistory[moveIndex + 1]) : ''}
                        </td>
                        <td style={{padding:"0px 2.5px 0px 2.5px"}}></td>
                    </tr>
                );
                })}
            </tbody>
        );
    }

    return (
      <div>
        <table style={{ borderCollapse: 'collapse', width: '100%', height: '100%'}}>
            {addRow()}
        </table>
      </div>
    );
  };
