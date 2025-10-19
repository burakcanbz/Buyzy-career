import { BASE_URL, ITEMS_PER_PAGE } from "../constants";
import axios from "axios";

export const getValues = (arr, key) => {
  const array = [];
  const _ = arr.filter((position) => {
    if (!array.includes(position[`${key}`].trim())) {
      array.push(position[`${key}`].trim());
      return true;
    }
    return false;
  });
  return array;
};

export const convertFromPositionToURL = (position) => {
  const filteredData = position
    .toLowerCase()
    .split(" ")
    .filter((item) => item !== "&");
  const positionURL = filteredData
    .map((item) => {
      return item.replace(/[()]/g, "");
    })
    .join("-");
  return positionURL;
};

export const getPageItems = (currentPage, data) => {
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);
  return currentItems;
};

export const getPageNumber = (totalPages) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return pageNumbers;
}

export const getTotalPages = (positions) => {
  return Math.ceil(positions.length / ITEMS_PER_PAGE);
}

export const calculateValues = (currentPage, searchedItems=null, openPositions=null) => {
  if (searchedItems.length > 0) {
    const currentPageItems = getPageItems(currentPage, searchedItems );
    const totalPages = getTotalPages(searchedItems);
    const pageNumbers = getPageNumber(totalPages);
    return [currentPageItems, totalPages, pageNumbers];
  } else {
    const currentPageItems = getPageItems(currentPage, openPositions)
    const totalPages = getTotalPages(openPositions);
    const pageNumbers = getPageNumber(totalPages);
    return [currentPageItems, totalPages, pageNumbers];
  }
};

export const getFilteredItems = (data, searchingItem) => {
  const filteredItems = data?.filter((item) => {
  const titleMatch = item.title.toString().toLowerCase().includes(searchingItem.toLowerCase());
  const divisionMatch = item.division.toString().toLowerCase().includes(searchingItem.toLowerCase());
  const locationMatch = item.location.toString().toLowerCase().includes(searchingItem);
  return titleMatch || divisionMatch || locationMatch})
  return filteredItems;
};

export const groupedById = (apps) => {
  if (apps) {
    const applicationGroup = apps.reduce((acc, obj) => {
      const id = String(obj.position.title);

      if (!acc[obj.position.id]) {
        acc[id] = [];
      }
      acc[id].push(obj);
      return acc;
    }, {});

    return Object.values(applicationGroup);
  }
  return null;
};

export const groupedByDivision = (apps) => {
  if (apps) {
    const applicationGroup = apps.reduce((acc, obj) => {
      const div = String(obj.position.division);

      if (!acc[obj.position.division]) {
        acc[div] = [];
      }
      acc[div].push(obj);
      return acc;
    }, {});

    return Object.values(applicationGroup);
  }
  return null;
}

export const getQueryParams = (queryParams) => {
    const allParams = {};
    queryParams.forEach((value, key) => {
      allParams[key] = value;
    });
    return allParams;
}

export const getQueryParamNames = (name, itemInfo) => {
  if (name === "title") {
    return { filterQuery: "id", nameQuery: itemInfo.position.id };
  } else if (name === "division") {
    return { filterQuery: name, nameQuery: itemInfo.position.division };
  }
  return { filterQuery: null, nameQuery: null };
};

export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const filesToBase64 = async (images) => {
  const promises = images.map((img) => {
    const reader = new FileReader();
    reader.readAsDataURL(img);

    return new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  });

  const base64Array = await Promise.all(promises);
  return base64Array;
};

export const downloadFile = async (fileName) => {
  try {
    const response = await axios.get(`${BASE_URL}/file`, {
      params: { fileName },
      withCredentials: true,
      responseType: 'blob'
    });

    const url = window.URL.createObjectURL(response.data);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

export const downloadImage = async(fileName) => {
  const filePath = `${process.env.PUBLIC_URL}/images/${fileName}`;
  const a = document.createElement("a");
  a.href = filePath;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}