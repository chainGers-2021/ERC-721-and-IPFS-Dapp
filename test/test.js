const File = artifacts.require("File")

require('chai')
	.use(require('chai-as-promised'))
	.should()

	contract('File', (accounts) => {
		let file

		before(async () => {
			file = await File.deployed()
		})

		describe('deployment', async() =>{
			it('Deployed Successfully', async() => {
				file = await File.deployed()
				const address = file.address
				console.log(address) 
				assert.notEqual(address, 0x0)
				assert.notEqual(address, '')
				assert.notEqual(address, null)
				assert.notEqual(address, undefined)
			})
		})

		describe('storage', async() =>{
			it('Updates the  fileHash', async() => {
				let fileHash
				fileHash = 'abc123'
				await file.set(fileHash)
				const result = await file.get()
				assert.equal(result, fileHash)
			})
		})


		describe('mintNFT', async() =>{
			it('Minting an NFT and getting its IPFS hash', async() => {
				let recipient = "0x1292EAb55cF30D93cdC96Ff87327d2Bf6A438e68"
				let r2 = "0xdB8944c1c40209446074d4AC0c8F8909fdd60928"
				let hash1 = "QmUEeRYpH4uUBQCSi5r7emM3L139mr3DqbhQ6pDz5PHMKB"
				let metaData1 = 'Bulbasaur1'
				const newItemId1 = (await file.awardItem.call(recipient, hash1, metaData1)).toNumber()
				assert.equal(newItemId1, 1)
				var gethash = await file.get()
				assert.equal(gethash, hash1)
				// let recipient = "0x1292EAb55cF30D93cdC96Ff87327d2Bf6A438e68"
				// let r2 = "0xdB8944c1c40209446074d4AC0c8F8909fdd60928"
				// let hash1 = "QmUEeRYpH4uUBQCSi5r7emM3L139mr3DqbhQ6pDz5PHMKB"
				// let hash2 = "QmTTS84W8iuYuH9czknSjZdbsEbSJPWxUYFJx8w8kUvuYX"
				// let metaData1 = 'Bulbasaur1'
				// let metaData2 = 'Bulbasaur2'
				// const newItemId1 = (await file.awardItem.call(recipient, hash1, metaData2)).toNumber()
				// assert.equal(newItemId1, 1)
				// const newItemId2 = (await file.awardItem.call(r2, hash2, metaData2)).toNumber()
				// assert.equal(newItemId2, 2)
			})
		})

	})

