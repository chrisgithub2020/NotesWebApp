import {CodegenConfig} from "@graphql-codegen/cli"

const codegenConfig: CodegenConfig = {
    schema: "./src/schema.graphql",
    generates: {
        "./src/types.ts": {
            plugins: ["typescript", "typescript-resolvers"],
            config: {
                contextType: "./context#DataSourceContext"
            }
        }
    }
}

export default codegenConfig