// Book manager

/* Create a menu app as seen in this week’s video. What you create is up to you as long as it meets the following requirements:
Use at least one array.
Use at least two classes.
Your menu should have the options to create, view, and delete elements. */

// publication class
class Publication {
	constructor(title,author,genre){
		this.title = title;
		this.author = author;
		this.genre = genre;
	}

	getDetails(){
		return `${this.title} by ${this.author} ${this.genre}`;
	}
}


// Book library
class BooKRepository{
	constructor(){
		this.publications = [];
	}
	addPublication(publication) {
		if (publication instanceof Publication){
			this.publications.push(publication)
		}else{
			throw new Error(`You can only add an instance of Publication. Received: ${publication}`);
		}
	}

	listPublications(){
		if (this.publications.length === 0){
			return 'The repository is empty.';
		}else{
			let publicationList = 'Repository Publications:\n';
			this.publications.forEach((publication, index) =>{
				publicationList += `${index + 1}) ${publication.getDetails()}\n`;
			});
			return publicationList;
		}
	}

	removePublication(index){
		if (index >= 0 && index < this.publications.length){
			this.publications.splice(index, 1);
		}else{
			throw new Error(`Invalid publication index: ${index}`);
		}
	}
}

class UserInterface{
	constructor(){
		this.myRepository = new BooKRepository();
	}

	start() {
		let choice = this.displayOptions();
		while (choice !== '0'){
			switch(choice){
				case '1':
					this.addPublication();
					break;
				case '2':
					this.listPublications();
					break;
				case '3':
					this.removePublication();
					break;
				default:
					alert('Invalid choice. Please try again.');
					break;
			}
			choice = this.displayOptions();
		}
		alert("GoodBye!");
	}

	displayOptions(){
		return prompt(`
		0) Exit
		1) Add a new publication
		2) List all publications
		3) Remove a publication`);
	}

	addPublication(){
		let title = prompt('Enter the title of the publication:');
		let author = prompt('Enter the author of the publication:');
		let genre = prompt('Enter the genre of the publication:');
		let newPublication = new Publication(title,author,genre);
		this.myRepository.addPublication(newPublication);
		alert(`"${title}" hsa been added to the repository`);
	}

	listPublications(){
		let publicationList = this.myRepository.listPublications();
		alert(publicationList);
	}

	removePublication(){
		let index = prompt('Enter the index of the publication you want to remove:');
		index = parseInt(index) - 1; // converting to zero-based index
		try {
			this.myRepository.removePublication(index);
			alert('Publication removed successfully.');

		}catch(err){
			alert(err.message);
		}
	}

}

let ui = new UserInterface();
ui.start();