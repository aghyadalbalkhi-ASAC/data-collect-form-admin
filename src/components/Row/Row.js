function Row(props){
    let round = props.round;
    return(
        <tr>
            <td>{round.namesofobservers}</td>
            <td>{round.notes}</td>
            <td>0{round.telnum}</td>
            <td>{round.dob.substring(0,10)}</td>
            <td>{round.idnum}</td>
            <td>{round.idtype}</td>
            <td>{round.ownername}</td>
            <td>{round.typeofactivity}</td>
            <td>{round.id}</td>
        </tr>
    );
}


export default Row;