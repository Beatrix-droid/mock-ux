export  const formatDate=(dateString:string)=>{
    const dateArray= dateString.split("-");
    const year=dateArray[0]
    const month=dateArray[1]
    const day=dateArray[2]

    const formattedDateString=day+"/"+month+"/"+year
    return formattedDateString;
  }