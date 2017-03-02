// Modified to test Lazada product
const urlRegex = /^((http[s]?):\/)?\/?www\.lazada\.vn\/[\-\w\.]+$/

export function testUrl(url) {
  return urlRegex.test(url);
}

function getTextFromQuery($, query) {
  return $(query).map(function(index, element) {
    return $(this).text();
  }).get();
}

function getPhoneName($) {
  return $('#prod_title').text().trim().split(' - ')[0];
}

function getPhoneImg($) {
  return $('meta[property="og:image"]').attr('content');
}

export function parsePhoneData($) {
  const titles = getTextFromQuery($, 'table.specification-table td:first-child');
  const values = getTextFromQuery($, 'table.specification-table td:last-child');
  const data = titles.map(function(title, index) {
    return { title, value: values[index] };
  });
  data.unshift(
    { title: 'Name', value: getPhoneName($) },
    { title: 'Image', value: getPhoneImg($) }
  );
  return data;
}

export function combineSpec(specA, specB) {
  const result = [];
  specA.forEach(({ title, value }) => {
    result.push({ title, valueA: value, valueB: '-' });
  });
  specB.forEach(({ title, value }) => {
    const existSpec = result.find((spec) => spec.title === title);
    if (existSpec) {
      existSpec.valueB = value;
    } else {
      result.push({ title, valueA: '-', valueB: value });
    }
  });
  return result;
}
