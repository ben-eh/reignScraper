let tagData = [];

await fetch('./metaTagsByURL.json')
.then((response) => response.json())
.then(
	(data) => {
		tagData = data;
	}
);

let uniqueNames = [];
let uniqueProperties = [];

Object.values(tagData).forEach((item) => {
	item.forEach((subItem) => {
		for (const [key, value] of Object.entries(subItem)) {
			// if (subItem['name'] !== null) console.log(subItem.name);
			if ( subItem['name'] !== null && !uniqueNames.includes(subItem.name) ) uniqueNames.push(subItem.name);
			if ( subItem.property !== null && !uniqueProperties.includes(subItem.property) ) uniqueProperties.push(subItem.property);
		}
	})
})

console.log('Unique Names:');
uniqueNames.forEach((item) => console.log(item));
console.log('Unique Properties');
uniqueProperties.forEach((item) => console.log(item));

const searchInput = document.getElementById('searcher');

const ul = document.querySelector('.results-list');

const displayItems = (list) => {
	list.forEach((item) => {
		const li = displayObjectProperties(item);
		ul.appendChild(li);
	})
}

const displayObjectProperties = (obj) => {
	const li = document.createElement('li');
	const pname = document.createElement('p');
	const pnamenode = document.createTextNode(obj.name);
	pname.appendChild(pnamenode);
	const pproperty = document.createElement('p');
	const ppropertynode = document.createTextNode(obj.property)
	pproperty.appendChild(ppropertynode);
	const pcontent = document.createElement('p');
	const pcontentnode = document.createTextNode(obj.content)
	pcontent.appendChild(pcontentnode);
	li.append(pname, pproperty, pcontent);
	return li;
}

const getListFromObject = (obj, inputString) => {
	const flatList = Object.values(obj).flat();
	return flatList.filter((item) => {
		const isName = item.name && item.name.includes(inputString);
		const isProperty = item.property && item.property.includes(inputString);
		const isContent = item.content && item.content.includes(inputString);
		return (isName || isProperty || isContent);
	})
}

const onInput = (e) => {
	const inputString = e.target.value;
	const filteredList = getListFromObject(tagData, inputString);
	clearFilteredList();
	displayItems(filteredList);
}

const clearFilteredList = () => {
	ul.innerHTML = '';
}

searchInput.addEventListener('input', onInput);