<template>
	<view>
		<view class="warehouse-details__info">
			<view class="details__statics">
				<view class="avatar"><image src="/static/images/avatar.png" mode="widthFix" class="avatar-img"></image></view>
				<view class="details__staticas--right">
					<text class="label-text">填写{{ type == 'recharge' ? '充值' : '提取' }}数量</text>
					<form class="form-wrap">
						<label class="uni-list-cell"><input type="text" v-model="count" /></label>
						<label class="maqueen">
							<view>可用余额</view>
							<view>12321 CIC</view>
						</label>
						<view class="details__btn">
							<view class="details__btn-tips"></view>
							<button type="default" style="margin: 0 0 0 auto !important;" @click="confirm()">确定</button>
						</view>
					</form>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			type: '',
			count: 0.0
		};
	},
	onLoad(options) {
		this.type = options.type;
		this.setTitle(options.type);
	},
	methods: {
		// 设置标题
		setTitle(type) {
			let title;
			switch (type) {
				case 'recharge':
					title = '充值';
					break;
				case 'withdraw':
					title = '提取';
					break;
			}
			uni.setNavigationBarTitle({
				title: `${title}`
			});
		},
		// TODO: 确定
		confirm() {
			if (this.count <= 0) {
				uni.showToast({
					title: `请输入${this.type == 'recharge' ? '充值' : '提取'}数量`,
					icon: 'none',
					duration: 2000
				});
				return;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
page {
	width: 100%;
	min-height: 100%;
	background: linear-gradient(to bottom, #11739d, #126c9a, #0b5b8f);
}
.details__staticas--right {
	background-color: transparent !important;
	.label-text {
		display: block;
		text-align: center;
		margin-top: 60rpx;
		margin-bottom: 20rpx;
		color: #ffffff;
		font-size: 32rpx;
	}
	.details__btn {
		background-color: transparent;
		margin: 50rpx 0 0 0 !important;
		padding: 0 !important;
	}
}
.form-wrap {
	.uni-list-cell {
		color: #ffffff;
		margin: 24rpx 0;
		border: 1px solid #579cc5;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 16rpx 32rpx;
		border-radius: 12rpx;
		background-color: #2d76a2;
		input {
			width: 100%;
			text-align: right;
		}
	}
	.maqueen {
		display: flex;
		justify-content: space-between;
		font-size: 24rpx;
		color: #ffffff;
	}
}
</style>
