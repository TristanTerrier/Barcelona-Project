export class Table {
    constructor(base_url, table_name) {
        this.base_url = base_url
        this.table_name = table_name
    }

    async findAll() {
        const data = await fetch(`${this.base_url}/${this.table_name}`).then(
            (response) => response.json()
        )
        return data
    }

    async findOneBy(key, value) {
        const data = await fetch(
            `${this.base_url}/${this.table_name}?${key}=${value}`
        )
            .then((response) => response.json())
            .then((data) => data[0])
        return data
    }

    async add(data) {
        const response = fetch(`${this.base_url}/${this.table_name}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((response) => response.json())
        return response
    }
}
