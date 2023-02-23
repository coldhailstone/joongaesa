export default (window) => {
	return new Promise((resolve) => {
		window.daum.postcode.load(() => {
			new window.daum.Postcode({
				oncomplete(data) {
					resolve(data);
				},
			}).open({
				popupName: 'KakaoPostCode',
				userLanguageType: 'K',
			});
		});
	});
};
