export const getLongGroupName = group =>
  `${group.courseName} (${
    group.groupNumber || group.groupHalf ? "grupa " : ""
  }${group.groupNumber}${group.groupHalf}${
    group.groupNumber || group.groupHalf ? ", " : ""
  }${group.fieldOfStudy} ${
    group.modeOfStudy === "ST" ? "stacjonarne" : "niestacjonarne"
  })`;
