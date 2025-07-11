import { render, screen } from "@testing-library/react";

import { describe, it, expect, vi, beforeEach } from "vitest";
import { BillModal } from "./BillModal";

describe("BillModal", () => {
	const mockOnClose = vi.fn();

	const mockBill = {
		bill_id: "3",
		billNo: "97",
		billType: "Public",
		status: "Rejected",
		sponsors: [{ sponsor: { as: { showAs: "Minister fro Finance" } } }],
		limit: 50,
		act: {
			actNo: "3",
			shortTitleEn: "English Short Title of Test Bill",
			shortTitleGa: "Gaeilge Short Title of Test Bill",
			longTitleEn: "Long English description of the test bill.",
			longTitleGa: "Long Gaeilge description of the test bill.",
		},
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("does not render the modal content when open prop is false", () => {
		render(<BillModal open={false} onClose={mockOnClose} bill={mockBill} />);

		expect(screen.queryByRole("presentation")).not.toBeInTheDocument();
		expect(
			screen.queryByText(mockBill.act!.shortTitleEn!),
		).not.toBeInTheDocument();
	});
});
