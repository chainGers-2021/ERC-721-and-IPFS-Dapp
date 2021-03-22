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
			it('Minting the First NFT', async() => {
				let recipient = "0x1292EAb55cF30D93cdC96Ff87327d2Bf6A438e68"
				let hash = "QmUEeRYpH4uUBQCSi5r7emM3L139mr3DqbhQ6pDz5PHMKB"
				let metaData = 'Bulbasaur'
				const newItemId = (await file.awardItem.call(recipient, hash, metaData)).toNumber()
				assert.equal(newItemId, 1)
			})
		})

	})

