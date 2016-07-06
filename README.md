# Titanium UI - ScrollView auto hide header and footer on scroll

xml
	
	<Widget src="com.imobicloud.scrollview">
		<View class="header" role="header"></View>
		<View class="footer" role="footer"></View>
		<ScrollView class="body" role="body">
			<View class="content">
				<Label top="300">300</Label>
				<Label top="1200">1200</Label>
				<Label top="2100">2100</Label>
			</View>
		</ScrollView>
	</Widget>

tss

	".header": { height: 44, top: 0, zIndex: 1, backgroundColor: '#646464' }
	".footer": { height: 44, bottom: 0, zIndex: 1, backgroundColor: 'red' }
	".body": { contentWidth: '100%', scrollType: 'vertical' }
		".content": { height: 3000 }

