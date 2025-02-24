async function readPostFile() {
    try {
        const response = await fetch('posts.txt'); // Fetch the text file
        if (!response.ok) throw new Error('Failed to load file');

        const text = await response.text();
        const lines = text.split('\n');
        
        if (lines.length < 4) {
            console.error('File does not contain enough lines');
            return;
        }

        const numberOfPosts = parseInt(lines[0].trim(), 10);
        if (isNaN(numberOfPosts) || numberOfPosts < 1) {
            console.error('Invalid number of posts');
            return;
        }

        let html = '';
        let lineIndex = 2; // Start after the number of posts and the empty line

        for (let i = 0; i < numberOfPosts; i++) {
            const title = lines[lineIndex++].trim();
            const rawDate = new Date(lines[lineIndex++].trim());
            rawDate.setDate(rawDate.getDate() + 1); // Adjust the date
            const date = `${('0' + (rawDate.getMonth() + 1)).slice(-2)}-${('0' + rawDate.getDate()).slice(-2)}-${rawDate.getFullYear()}`;
            const number = lines[lineIndex++].trim() || '1'; // Ensure there is a number
            const description = lines[lineIndex++].trim();
            lineIndex++; // Skip the empty line

            const link = `posts/post${number}.html`;

            html += `
                <div>
                    <h1>${title}</h1>
                    <p>${date}</p>
                    <p>${description}</p>
                    <p><a href="${link}">Read more...</a></p>
                </div>
            `;
        }

        document.getElementById('blog-posts').innerHTML = html;

    } catch (error) {
        console.error('Error:', error);
    }
}

readPostFile(); // Call the function to load the post
