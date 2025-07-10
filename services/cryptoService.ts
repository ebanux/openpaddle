
import { PageSessionData } from '../types';

// IMPORTANT: In a real app, this salt must be a secure, secret environment variable on the server.
const SECRET_SALT = "YOUR_SUPER_SECRET_SALT_HERE_12345"; 

export async function sha256(str: string): Promise<string> {
    const textAsBuffer = new TextEncoder().encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', textAsBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function generateAuthenticityHash(session: PageSessionData): Promise<string> {
    const dataString = `${session.accessCode}-${session.pageConfig.id}-${session.paymentDetails.paymentTimestamp}-${SECRET_SALT}`;
    return await sha256(dataString);
}

// Simple Merkle Tree simulator
export class MerkleTree {
    leaves: string[];
    layers: string[][];

    constructor(leaves: string[]) {
        this.leaves = [...new Set(leaves)].sort(); // Deduplicate and sort leaves for consistent tree structure
        this.layers = [this.leaves];
    }

    async createTree() {
        if (this.leaves.length === 0) return;
        while (this.layers[this.layers.length - 1].length > 1) {
            const lastLayer = this.layers[this.layers.length - 1];
            const newLayer: string[] = [];
            for (let i = 0; i < lastLayer.length; i += 2) {
                if (i + 1 < lastLayer.length) {
                    const combined = (lastLayer[i] < lastLayer[i + 1] ? lastLayer[i] : lastLayer[i + 1]) + (lastLayer[i] < lastLayer[i + 1] ? lastLayer[i + 1] : lastLayer[i]);
                    newLayer.push(await sha256(combined));
                } else {
                    newLayer.push(lastLayer[i]); // Handle odd number of leaves
                }
            }
            this.layers.push(newLayer);
        }
    }

    getRoot(): string | null {
        if (this.layers.length === 0 || this.layers[this.layers.length - 1].length === 0) {
            return null;
        }
        return this.layers[this.layers.length - 1][0];
    }

    getProof(leaf: string): string[] {
        let index = this.leaves.findIndex(l => l === leaf);
        if (index === -1) return [];

        const proof: string[] = [];
        for (let i = 0; i < this.layers.length - 1; i++) {
            const layer = this.layers[i];
            const isRightNode = index % 2 === 1;
            const siblingIndex = isRightNode ? index - 1 : index + 1;

            if (siblingIndex < layer.length) {
                proof.push(layer[siblingIndex]);
            }
            index = Math.floor(index / 2);
        }
        return proof;
    }
}
