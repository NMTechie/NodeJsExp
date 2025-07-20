function getMinOriginMaxDevYear(currOriginYear, currDevYear, yearInfo) {
    return {
        minOriginYear: yearInfo.minOriginYear === -1 ? currOriginYear : Math.min(currOriginYear, yearInfo.minOriginYear),
        maxDevYear: yearInfo.maxDevYear === -1 ? currDevYear : Math.max(currDevYear, yearInfo.maxDevYear)
    };
}



export default { getMinOriginMaxDevYear };